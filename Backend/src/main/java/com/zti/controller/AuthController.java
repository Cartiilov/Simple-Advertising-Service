package com.zti.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import com.zti.model.UserInfo;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.zti.model.auth.ERole;
import com.zti.model.auth.Role;
import com.zti.model.auth.User;
import com.zti.payload.request.LoginRequest;
import com.zti.payload.request.SignupRequest;
import com.zti.payload.request.UserRequest;
import com.zti.payload.response.JwtResponse;
import com.zti.payload.response.MessageResponse;
import com.zti.repository.RoleRepository;
import com.zti.repository.UserRepository;
import com.zti.security.jwt.JwtUtils;
import com.zti.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController
{
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest)
    {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity
                .ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest)
    {
        if (userRepository.existsByUsername(signUpRequest.getUsername()))
        {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail()))
        {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }

        User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        }
        else
        {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    case "mod":
                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }
        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/user")
    public ResponseEntity<UserInfo> getUserById()
    {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();

        Optional<User> userData = userRepository.findById(userDetails.getId());

        if (userData.isPresent())
        {
            User user = userData.get();
            UserInfo userResponse = new UserInfo();
            userResponse.setId(user.getId());
            userResponse.setUsername(user.getUsername());
            userResponse.setEmail(user.getEmail());
            return new ResponseEntity<>(userResponse, HttpStatus.OK);
        } else
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/user/update")
    public ResponseEntity<?> updateUser(@Valid @RequestBody UserRequest userRequest)
    {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
        Optional<User> userOptional = userRepository.findById(userDetails.getId());

        if (userOptional.isPresent())
        {
            User user = userOptional.get();

            if (userRepository.existsByEmail(userRequest.getEmail()) && !user.getEmail().equals(userRequest.getEmail()))
            {
                return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
            }

            if (userRepository.existsByUsername(userRequest.getUsername()) && !user.getUsername().equals(userRequest.getUsername()))
            {
                return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
            }

            user.setEmail(userRequest.getEmail());
            user.setUsername(userRequest.getUsername());
            userRepository.save(user);

            return ResponseEntity.ok(new MessageResponse("User updated successfully!"));
        } else
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

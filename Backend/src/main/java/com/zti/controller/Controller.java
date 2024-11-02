package com.zti.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.zti.model.Photo;
import com.zti.model.auth.User;
import com.zti.security.services.UserDetailsImpl;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.zti.payload.request.PostRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import java.util.HashMap;
import java.util.Map;

import com.zti.model.Post;
import com.zti.model.UserInfo;
import com.zti.repository.PhotoRepository;
import com.zti.repository.PostRepository;
import com.zti.repository.UserRepository;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.stream.Collectors;

//@CrossOrigin(origins = "http://localhost:5173")
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class Controller {
    private static final Logger logger = LoggerFactory.getLogger(Controller.class);

    @Autowired
    PostRepository postRepository;

    @Autowired
    PhotoRepository photoRepository;

    @Autowired
    UserRepository userRepository;

    public Controller(PostRepository postRepository)
    {
        this.postRepository = postRepository;
    }

    @GetMapping("/hello")
    public ResponseEntity<String> Hello(){
        return new ResponseEntity<String>("Hello World", HttpStatus.OK);
    }

    @GetMapping("/")
    public String index() {
        return "Greetings from Spring Boot!";
    }


    @PreAuthorize("isAuthenticated()")
    @PostMapping("/posts")
    public ResponseEntity<?> createPost(@Valid @RequestBody PostRequest postRequest)
    {
        try
        {
            logger.info("Attempting to post: {}", postRequest);
            Map<String, String> response = new HashMap<>();
            Post post = new Post();
            post.setTitle(postRequest.getTitle());
            post.setContent(postRequest.getContent());
            
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();

            post.setAuthorId(userDetails.getId());
            post.setCreatedAt(postRequest.getCreatedAt());
            Post savedPost = postRepository.save(post);
            logger.info("Post created: {}", savedPost);
            response.put("status", "success");
            response.put("message", "Post created successfully");
            response.put("postId", String.valueOf(savedPost.getId()));
            return ResponseEntity.ok(response);
        } catch (Exception e)
        {
            logger.error("Error creating post", e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/posts/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody PostRequest postRequest)
    {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
        Long currentUserId = userDetails.getId();

        Optional<Post> postOptional = postRepository.findById(id);
        if (postOptional.isPresent())
        {
            Post post = postOptional.get();
            if (!post.getAuthorId().equals(currentUserId))
            {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            try
            {
                Post updated = new Post();
                post.setTitle(postRequest.getTitle());
                post.setContent(postRequest.getContent());

                post.setAuthorId(currentUserId);
                post.setCreatedAt(post.getCreatedAt());
                Post savedPost = postRepository.save(post);
                logger.info("Post updated: {}", savedPost);
                return ResponseEntity.ok(savedPost);
            } catch (Exception e)
            {
                logger.error("Error creating post", e);
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }


     @PreAuthorize("isAuthenticated()")
     @DeleteMapping("/posts/{id}")
     public ResponseEntity<HttpStatus> deletePost(@PathVariable("id") long id)
     {
         Authentication auth = SecurityContextHolder.getContext().getAuthentication();
         UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
         Long currentUserId = userDetails.getId();
         Optional<Post> postData = postRepository.findById(id);

         if (postData.isPresent())
         {
             Post post = postData.get();
             if (!post.getAuthorId().equals(currentUserId))
             {
                 return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
             }
             List<Photo> photosToDelete = photoRepository.findByPost(id);

             if (!photosToDelete.isEmpty())
             {
                 photoRepository.deleteAll(photosToDelete);
             }

             postRepository.deleteById(id);
             return new ResponseEntity<>(HttpStatus.NO_CONTENT);
         }
         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
     }

     @GetMapping("/posts/author/{authorId}")
     public ResponseEntity<List<Map<String, Object>>> getPostsByAuthor(@PathVariable("authorId") long authorId, HttpServletRequest request)
     {
         Optional<User> userData = userRepository.findById(authorId);

         if (userData.isPresent())
         {
             User author = userData.get();

             List<Post> posts = postRepository.findByAuthorId(authorId);
             if (posts.isEmpty())
             {
                 return new ResponseEntity<>(HttpStatus.NO_CONTENT);
             } else
             {
                List<Map<String, Object>> postsWithPhotoLinks = posts.stream().map(post -> {
                    Map<String, Object> postMap = new HashMap<>();
                    postMap.put("id", post.getId());
                    postMap.put("title", post.getTitle());
                    postMap.put("content", post.getContent());
                    List<Photo> photos = photoRepository.findByPost(post.getId());
                    String photoLink = photos.isEmpty() ? null : photos.get(0).getResourceUrl(request);
                    postMap.put("photoLink", photoLink);
                    return postMap;
                }).collect(Collectors.toList());
                return new ResponseEntity<>(postsWithPhotoLinks, HttpStatus.OK);
             }
         } else
         {
             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
         }
     }

    @GetMapping("/posts")
    public ResponseEntity<List<Map<String, Object>>> getAllPosts(HttpServletRequest request)
    {
        try
        {
            List<Post> posts = new ArrayList<>(postRepository.findAll());
            if (posts.isEmpty())
            {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            List<Map<String, Object>> postsWithPhotoLinks = posts.stream().map(post -> {
                Map<String, Object> postMap = new HashMap<>();
                postMap.put("id", post.getId());
                postMap.put("title", post.getTitle());
                postMap.put("content", post.getContent());
                List<Photo> photos = photoRepository.findByPost(post.getId());
                String photoLink = photos.isEmpty() ? null : photos.get(0).getResourceUrl(request);
                postMap.put("photoLink", photoLink);
                return postMap;
            }).collect(Collectors.toList());
            return new ResponseEntity<>(postsWithPhotoLinks, HttpStatus.OK);
        } catch (Exception e)
        {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/posts/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable("id") long id)
    {
        Optional<Post> postData = postRepository.findById(id);

        return postData.map(post -> new ResponseEntity<>(post, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserInfo> getUserById(@PathVariable("id") long id)
    {
        Optional<User> userData = userRepository.findById(id);

        if (userData.isPresent())
        {
            User user = userData.get();
            UserInfo userResponse = new UserInfo();
            userResponse.setId(id);
            userResponse.setUsername(user.getUsername());
            userResponse.setEmail(user.getEmail());
            return new ResponseEntity<>(userResponse, HttpStatus.OK);
        } else
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "post/photo/{postId}", method = RequestMethod.GET)
    public ResponseEntity<?> getImage(@PathVariable("postId") long id, HttpServletRequest request)
    {
        logger.info("Attempting to get photos of post: {}", id);

        List<Photo> photos = photoRepository.findByPost(id);
        if (photos.isEmpty())
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else
        {
            List<Map<String, Object>> imagesData = photos.stream().map(photo -> {
                Map<String, Object> imageData = new HashMap<>();
                imageData.put("id", photo.getId());
                imageData.put("name", photo.getName());
                imageData.put("photoLink", photo.getResourceUrl(request));
                return imageData;
            }).collect(Collectors.toList());
            return new ResponseEntity<>(imagesData, HttpStatus.OK);
        }
    }
}
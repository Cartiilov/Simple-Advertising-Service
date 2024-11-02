package com.zti.payload.request;

import java.util.Set;
import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.*;

public class SignupRequest {

    @Getter
    @Setter
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;

    @Getter
    @Setter
    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @Getter
    @Setter
    private Set<String> role;

    @Getter
    @Setter
    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

}

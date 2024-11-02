package com.zti.payload.request;
import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.NotBlank;

@Getter
@Setter
public class UserRequest {


    @NotBlank
    private String username;

    @NotBlank
    private String email;

}

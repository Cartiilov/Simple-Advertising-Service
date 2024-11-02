package com.zti.payload.response;

import lombok.Setter;
import lombok.Getter;

import java.util.List;

public class JwtResponse {
    private String token;
    private String type = "Bearer";

    private Long id;


    @Setter
    @Getter
    private String username;


    @Setter
    @Getter
    private String email;

    @Setter
    @Getter
    private List<String> roles;

    public JwtResponse(String accessToken, Long id, String username, String email, List<String> roles) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
    }

    public String getAccessToken() {
        return token;
    }

    public void setAccessToken(String accessToken) {
        this.token = accessToken;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTokenType() {
        return type;
    }

    public void setTokenType(String tokenType) {
        this.type = tokenType;
    }

}
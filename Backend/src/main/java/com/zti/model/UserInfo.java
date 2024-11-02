package com.zti.model;

import lombok.Getter;
import lombok.Setter;

@Getter
public class UserInfo {

    @Setter private long id;

    @Getter
    @Setter
    private String username;

    @Getter
    @Setter
    private String email;

    public UserInfo() {

    }

    public UserInfo(int id, String username, String email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }

}

package com.zti.payload.response;

import lombok.Getter;
import lombok.Setter;

public class MessageResponse {
    @Setter
    @Getter
    private String message;

    public MessageResponse(String message) {
        this.message = message;
    }
}

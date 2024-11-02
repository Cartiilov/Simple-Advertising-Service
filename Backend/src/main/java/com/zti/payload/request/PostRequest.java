package com.zti.payload.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.NotBlank;
import java.sql.Timestamp;

@Getter
public class PostRequest {
    
    @Setter
    @NotBlank
    private String title;

    @Setter
    @NotBlank
    private String content;
    
    @Schema(hidden=true)
    private Long authorId;

    @Setter
    @NotBlank
    private Timestamp createdAt;

}
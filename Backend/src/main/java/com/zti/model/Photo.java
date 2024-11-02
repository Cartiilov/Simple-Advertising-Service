package com.zti.model;

import org.springframework.content.commons.annotations.ContentId;
import org.springframework.content.commons.annotations.ContentLength;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.content.commons.annotations.MimeType;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


@Entity
@Getter
@Table(name = "photos")
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @JsonIgnore
    @Column(name = "postId")
    private Long post;

    @ContentId
    @Setter
    @Column(name = "photo")
    private String photo;

    @Setter
    @NotNull
    @NotBlank
    private String name;

    @Setter
    @ContentLength
    private Long contentLength;

    @Setter
    @MimeType
    private String MimeType;

    public String getResourceUrl(HttpServletRequest request) {
        String baseUrl = getBaseUrl(request);
        return baseUrl + "/photos/" + this.getId().toString();
    }

    private String getBaseUrl(HttpServletRequest request) {
        String scheme = request.getScheme();
        String serverName = request.getServerName();
        int serverPort = request.getServerPort();
        String contextPath = request.getContextPath();

        StringBuilder url = new StringBuilder();
        url.append(scheme).append("://").append(serverName);

        if (serverPort != 80 && serverPort != 443) {
            url.append(":").append(serverPort);
        }

        url.append(contextPath);

        return url.toString();
    }


}
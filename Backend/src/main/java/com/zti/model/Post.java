package com.zti.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Table(name = "post")
public class Post {
    @Id
    @Getter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Getter
    @Setter
    @Column(name = "title")
    private String title;

    @Getter
    @Setter
    @Column(name = "content", columnDefinition="TEXT")
    private String content;

    @Getter
    @Setter
    @JoinColumn(name = "author_id", referencedColumnName = "id")
    private Long authorId;

    @Getter
    @Setter
    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;

    public Post() {

    }

    public Post(String title, String content, Long authorId, Timestamp createdAt) {
        this.title = title;
        this.content = content;
        this.authorId = authorId;
        this.createdAt = createdAt;
    }
}
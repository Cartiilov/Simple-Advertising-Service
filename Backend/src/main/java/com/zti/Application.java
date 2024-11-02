package com.zti;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.content.fs.io.FileSystemResourceLoader;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    FileSystemResourceLoader fileSystemResourceLoader() {
        return new FileSystemResourceLoader("./images");
    }

}
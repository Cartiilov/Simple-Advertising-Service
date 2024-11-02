package com.zti.repository;

import com.zti.model.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(path="photos", collectionResourceRel="photos")
public interface PhotoRepository extends JpaRepository<Photo, Long> {
    List<Photo> findByPost(long post);
}
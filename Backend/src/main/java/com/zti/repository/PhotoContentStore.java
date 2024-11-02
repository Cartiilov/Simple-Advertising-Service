package com.zti.repository;

import com.zti.model.Photo;
import org.springframework.content.commons.store.ContentStore;

import org.springframework.content.rest.StoreRestResource;

@StoreRestResource
public interface PhotoContentStore extends ContentStore<Photo, String> {
}

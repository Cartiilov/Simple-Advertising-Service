package com.zti.controller;


import com.zti.model.Photo;
import com.zti.model.Post;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.zti.repository.PostRepository;
import com.zti.repository.PhotoRepository;
import com.zti.repository.PhotoContentStore;
import org.springframework.http.HttpHeaders;
import jakarta.servlet.http.HttpServletRequest;

@CrossOrigin
@RestController
@RequestMapping("/photos")
public class PhotoController {

private static final Logger logger = LoggerFactory.getLogger(PhotoController.class);

    @Autowired
    private PhotoRepository photosRepo;

    @Autowired
    private PhotoContentStore contentStore;

    @Autowired
    private PostRepository postRepo;

    final private static List<String> allowedExtensions = Arrays.asList(".jpg", ".jpeg", ".png", ".gif");

    @RequestMapping(value = "/get/{postId}", method = RequestMethod.GET)
    public ResponseEntity<?> getImage(@PathVariable("postId") long id)
    {

        Optional<Photo> f = photosRepo.findById(id);
        if (f.isPresent())
        {
            InputStreamResource inputStreamResource = new InputStreamResource(contentStore.getContent(f.get()));
            HttpHeaders headers = new HttpHeaders();

            headers.setContentLength(f.get().getContentLength());
            headers.set("Content-Type", f.get().getMimeType());
            return new ResponseEntity<Object>(inputStreamResource, headers, HttpStatus.OK);
        }
        return null;
    }

    @RequestMapping(value = "/create/{postId}", method = RequestMethod.POST)
    public ResponseEntity<?> uploadImage(@PathVariable("postId") Long postId, @RequestParam("image") MultipartFile file, HttpServletRequest request)
            throws IOException
    {
        logger.info("Attempting to post a photo for: {}", postId);
        Map<String, String> response = new HashMap<>();

        if (file.isEmpty())
        {
            response.put("status", "error");
            response.put("message", "No file uploaded");
            response.put("link", null);
            return new ResponseEntity<Object>(response, HttpStatus.BAD_REQUEST);
        }

        Optional<Post> p = postRepo.findById(postId);
        if (p.isEmpty())
        {
            response.put("status", "error");
            response.put("message", "The post that you want to add the photo to does not exist");
            response.put("link", null);
            return new ResponseEntity<Object>(response, HttpStatus.NOT_FOUND);
        }

        String fileType = file.getOriginalFilename();
        if (fileType != null)
        {
            fileType = fileType.substring(file.getOriginalFilename().lastIndexOf("."));
        }

        if (fileType == null || !allowedExtensions.contains(fileType))
        {
            response.put("status", "error");
            response.put("message", "This filetype is not allowed");
            return new ResponseEntity<Object>(response, HttpStatus.BAD_REQUEST);
        }

        Photo image = new Photo();
        image.setMimeType(file.getContentType());
        image.setName(file.getOriginalFilename());
        image.setContentLength(file.getSize());
        image.setPost(postId);

        contentStore.setContent(image, file.getInputStream());
        photosRepo.save(image);

        response.put("status", "success");
        response.put("message", "Photo uploaded successfully");
        response.put("link", image.getResourceUrl(request));
        response.put("uid", image.getId().toString());

        return new ResponseEntity<Object>(response, HttpStatus.OK);
    }

}
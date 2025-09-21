package com.gmit.onlinejob.controller;

import com.gmit.onlinejob.model.Product;
import com.gmit.onlinejob.services.ProductServices;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/auth/product")
public class ProductController {
    private final Path fileStorageLocation;
    private final ProductServices productServices;


    @Autowired
    public ProductController(ProductServices productServices,
                             @Value("${file.upload-dir:uploads}") String uploadDir) {
        this.productServices = productServices;
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    //upload Product API
    // Create a new course with image upload
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createProduct(
            @RequestParam("name") String name,
            @RequestParam("price") Double price,
            @RequestParam(value = "image", required = false) MultipartFile imageFile) {
        try {
            Product product = new Product();
            product.setName(name);
            product.setPrice(price);

            // Handle image upload
            if (imageFile != null && !imageFile.isEmpty()) {
                String imagePath = storeFile(imageFile);
                product.setImage(imagePath);
            }

            Product createdProduct = productServices.uploadProduct(product);
            return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    //get all product API
    @GetMapping("/getAllProducts")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productServices.getAllProduct();
        return ResponseEntity.ok(products);
    }

    // Private helper methods for file handling
    private String storeFile(MultipartFile file) {
        try {
            // Validate file
            if (file.isEmpty()) {
                throw new RuntimeException("Failed to store empty file");
            }

            // Check file type
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                throw new RuntimeException("Only image files are allowed");
            }

            // Generate unique filename
            String originalFilename = file.getOriginalFilename();
            String fileExtension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }

            String filename = UUID.randomUUID().toString() + fileExtension;

            // Copy file to target location
            Path targetLocation = this.fileStorageLocation.resolve(filename);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return filename;
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file. Please try again!", ex);
        }
    }

    private void deleteFile(String filename) {
        try {
            if (filename != null && !filename.isEmpty()) {
                Path filePath = this.fileStorageLocation.resolve(filename).normalize();
                Files.deleteIfExists(filePath);
            }
        } catch (IOException ex) {
            // Log the error but don't throw exception as it's not critical
            System.err.println("Could not delete file: " + filename + ". Error: " + ex.getMessage());
        }
    }

    private String determineContentType(String filename) {
        try {
            Path filePath = this.fileStorageLocation.resolve(filename).normalize();
            String contentType = Files.probeContentType(filePath);
            if (contentType != null) {
                return contentType;
            }
        } catch (IOException ex) {
            // Fall back to extension-based detection
        }

        // Fallback based on file extension
        String extension = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
        switch (extension) {
            case "jpg":
            case "jpeg":
                return "image/jpeg";
            case "png":
                return "image/png";
            case "gif":
                return "image/gif";
            case "webp":
                return "image/webp";
            case "svg":
                return "image/svg+xml";
            default:
                return "application/octet-stream";
        }
    }


    private String getBaseUrl(HttpServletRequest request) {
        String scheme = request.getScheme();
        String serverName = request.getServerName();
        int serverPort = request.getServerPort();
        String contextPath = request.getContextPath();

        StringBuilder url = new StringBuilder();
        url.append(scheme).append("://").append(serverName);

        if ((scheme.equals("http") && serverPort != 80) ||
                (scheme.equals("https") && serverPort != 443)) {
            url.append(":").append(serverPort);
        }

        url.append(contextPath);
        return url.toString();
    }
}

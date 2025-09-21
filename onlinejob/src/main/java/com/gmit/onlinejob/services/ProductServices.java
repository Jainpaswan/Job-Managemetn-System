package com.gmit.onlinejob.services;

import com.gmit.onlinejob.model.Product;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface ProductServices {
    String deleteProduct(Long id);
    List<Product> getAllProduct();
    Product getProductById(Long id);
    Product uploadProduct(Product p);
    Product updateProduct(Long id, Product product);
    List<Product> saveAll(List<Product> product);
}

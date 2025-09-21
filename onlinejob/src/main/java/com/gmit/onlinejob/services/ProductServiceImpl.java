package com.gmit.onlinejob.services;

import com.gmit.onlinejob.model.Product;
import com.gmit.onlinejob.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ProductServiceImpl implements ProductServices{
    @Autowired
    private ProductRepository productRepository;

    @Override
    public String deleteProduct(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return"Product deleted successfully";
        }else {
            return "Product not found ";
        }
    }

    @Override
    public List<Product> getAllProduct() {
        // TODO Auto-generated method stub
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(Long id) {
        // TODO Auto-generated method stub
        return productRepository.findById(id).orElseThrow(()-> new RuntimeException( "Product not found with id:"+id));
    }



    @Override
    public List<Product> saveAll(List<Product> product) {
        // TODO Auto-generated method stub
        return productRepository.saveAll(product);
    }

    @Override
    public Product uploadProduct(Product p) {
        // TODO Auto-generated method stub
        return productRepository.save(p);
    }

    @Override
    public Product updateProduct(Long id, Product product) {

        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        existing.setName(product.getName());
        existing.setPrice(product.getPrice());
        existing.setImage(product.getImage());

        return productRepository.save(existing);
    }
}

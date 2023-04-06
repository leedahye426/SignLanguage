package signLanguage.signLanguage.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import signLanguage.signLanguage.model.Category;
import signLanguage.signLanguage.repository.CategoryRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    public List<Category> findCategories() {
        return categoryRepository.findAll();
    }
}

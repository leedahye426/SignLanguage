package signLanguage.signLanguage.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import signLanguage.signLanguage.model.Category;
import signLanguage.signLanguage.service.CategoryService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class LearningController {

    private final CategoryService categoryService;
    @GetMapping("/learning")
    public Map<String, Object> learningPage() {
        Map<String, Object> dataMap = new HashMap<>();

        //카테고리
        List<Category> categories = categoryService.findCategories();
        dataMap.put("categories", categories);
        return dataMap;
    }



}

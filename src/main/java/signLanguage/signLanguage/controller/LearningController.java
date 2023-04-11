package signLanguage.signLanguage.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import signLanguage.signLanguage.MemberUtils;
import signLanguage.signLanguage.model.Category;
import signLanguage.signLanguage.model.Member;
import signLanguage.signLanguage.model.Sign;
import signLanguage.signLanguage.service.CategoryService;
import signLanguage.signLanguage.service.MemberService;
import signLanguage.signLanguage.service.SignService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class LearningController {

    private final CategoryService categoryService;
    private final MemberService memberService;
    private final SignService signService;
    @GetMapping("/learning")
    public Map<String, Object> learningPage() {
        Map<String, Object> dataMap = new HashMap<>();

        //카테고리
        List<Category> categories = categoryService.findCategories();
        dataMap.put("categories", categories);

        return dataMap;
    }

    @GetMapping("/learning/{categoryId}")
    public Map<String, Object> category(@PathVariable("categoryId") Long categoryId) {
        Map<String, Object> dataMap = new HashMap<>();

        Member loginMember = MemberUtils.getLoginMember(memberService);

        //카테고리
        List<Category> categories = categoryService.findCategories();
        dataMap.put("categories", categories);

        //해당 카테고리에 속한 수어 list
        List<Sign> signs = signService.findByCategory(categoryId);
        dataMap.put("signs", signs);

        return dataMap;
    }

    @GetMapping("/learning/{categoryId}/{signId}")
    public Map<String, Object> sign(@PathVariable("categoryId") Long categoryId, @PathVariable("signId") Long signId) {
        Map<String, Object> dataMap = new HashMap<>();

        Member loginMember = MemberUtils.getLoginMember(memberService);

        //카테고리
        List<Category> categories = categoryService.findCategories();
        dataMap.put("categories", categories);

        //해당 카테고리에 속한 수어 list
        List<Sign> signs = signService.findByCategory(categoryId);
        dataMap.put("signs", signs);

        //해당 수어
        Sign sign = signService.findSign(signId);
        dataMap.put("sign", sign);

        return dataMap;
    }



}

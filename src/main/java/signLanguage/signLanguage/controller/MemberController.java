package signLanguage.signLanguage.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import signLanguage.signLanguage.model.Category;
import signLanguage.signLanguage.model.Member;
import signLanguage.signLanguage.model.Sign;
import signLanguage.signLanguage.service.CategoryService;
import signLanguage.signLanguage.service.MemberService;
import signLanguage.signLanguage.service.SignService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final CategoryService categoryService;
    private final SignService signService;
//    @GetMapping("/members/signupForm")
//    public String joinForm() {
//        return "signup";
//    }
    @PostMapping("/api/signup")
    public ResponseEntity<?> join(@RequestBody Member member) { // json -> java 객체
        String rawPasswd = member.getPasswd();
        String encPasswd = passwordEncoder.encode(rawPasswd);

        member.setPasswd(encPasswd);
        Member createMember = memberService.join(member);
        return ResponseEntity.ok(createMember);

    }

    @GetMapping("/api/mypage")
    public List<Map<String, Object>> mypage() {
        List<Map<String, Object>> list = new ArrayList<>();
        List<Category> categories = categoryService.findCategories();
        for(Category category: categories) {
            Long id = category.getCategoryId();
            List<Sign> signs = signService.findByCategory(id);
            Map<String, Object> map = new HashMap<>();
            map.put("category", category);
            map.put("signs",signs);
            list.add(map);
        }
        System.out.println(categories);
        return list;
    }



}

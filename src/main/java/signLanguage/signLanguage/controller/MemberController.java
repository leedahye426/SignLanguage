package signLanguage.signLanguage.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import signLanguage.signLanguage.model.Member;
import signLanguage.signLanguage.service.MemberService;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/member/signup")
    public String joinForm() {
        return "signup";
    }
    @PostMapping("/member/signup")
    public String join(@RequestBody Member member) { // json -> java 객체

        Member createMember = memberService.join(member);
        System.out.println("회원가입 성공");
        return "redirect:/";

    }
}

package signLanguage.signLanguage.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import signLanguage.signLanguage.model.Member;
import signLanguage.signLanguage.service.MemberService;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final BCryptPasswordEncoder passwordEncoder;
//    @GetMapping("/members/signupForm")
//    public String joinForm() {
//        return "signup";
//    }
    @PostMapping("/members/signup")
    public ResponseEntity<?> join(@RequestBody Member member) { // json -> java 객체
        String rawPasswd = member.getPasswd();
        String encPasswd = passwordEncoder.encode(rawPasswd);
        member.setPasswd(encPasswd);
        member.setAuthority("ROLE_USER");
        Member createMember = memberService.join(member);
        System.out.println("회원가입 성공");
        return ResponseEntity.ok(createMember);

    }



}

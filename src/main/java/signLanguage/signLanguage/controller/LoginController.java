package signLanguage.signLanguage.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import signLanguage.signLanguage.service.MemberService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequiredArgsConstructor
public class LoginController {

    private final MemberService memberService;
    private final JdbcTemplate jdbcTemplate;
    @GetMapping("/member/login")
    public String loginForm() {
        System.out.println("로그인 페이지 입니다.");
        return "member/login";
    }

    @PostMapping("/member/login")
    public String login(HttpServletRequest request, @RequestParam("email") String email, @RequestParam("passwd") String passwd) {
        //로그인 로직
        System.out.println("email : " + email);
        System.out.println("passwd : " + passwd);

        if(memberService.existCheck(email, passwd)) {
            //세션에 로그인 정보 저장
            HttpSession session = request.getSession();
            session.setAttribute("email", email);
            return "success";
        }
        return "failure";

    }

    @PostMapping("/member/logout")
    public String logout(HttpSession session) {
        // 로그아웃 시 세션 삭제
        session.invalidate();
        return "redirect:/";
    }
}

package signLanguage.signLanguage.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequiredArgsConstructor
public class LoginController {

    @GetMapping("/member/login")
    public String login(HttpServletRequest request) {
        System.out.println("로그인 페이지 입니다.");

        return "member/login";
    }

    @PostMapping("/member/login")
    public String login() {
        //로그인 로직
        return "/";
    }

    @PostMapping("/logout")
    public String logout(HttpServletRequest request) {
        return "redirect:/";
    }
}

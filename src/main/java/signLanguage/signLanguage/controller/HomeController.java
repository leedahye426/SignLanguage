package signLanguage.signLanguage.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import signLanguage.signLanguage.model.Member;
import signLanguage.signLanguage.model.Sign;
import signLanguage.signLanguage.service.MemberService;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class HomeController {

    private final MemberService memberService;

    @GetMapping("/")
    public String home(Model model) {
        //랜덤으로 오늘의 수어 가져오기
        System.out.println("db test");
        Member member = memberService.findMember(1);

        model.addAttribute("member", member);

        return "home";
    }
}

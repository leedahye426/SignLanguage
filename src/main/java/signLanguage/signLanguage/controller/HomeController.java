package signLanguage.signLanguage.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import signLanguage.signLanguage.MemberUtils;
import signLanguage.signLanguage.model.Member;
import signLanguage.signLanguage.model.Sign;
import signLanguage.signLanguage.service.MemberService;
import signLanguage.signLanguage.service.SignService;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class HomeController {
    private final SignService signService;
    private final MemberService memberService;
    @GetMapping("/api/home")
    public List<Sign> home() {
        Map<String, Object> dataMap = new HashMap<>();

        // 랜덤으로 오늘의 수어 가져오기
        int limit = 2; //랜덤 갯수
        List<Sign> todaySigns = signService.findRandomSigns(limit);
//        for(Sign s : todaySigns) System.out.println(s.getWord());
        dataMap.put("todaySigns", todaySigns);

        // 현재 로그인한 사용자 정보 가져오기
//        Member loginMember = MemberUtils.getLoginMember(memberService);
//        dataMap.put("loginMember", loginMember);
        return todaySigns;
    }
}

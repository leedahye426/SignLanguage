package signLanguage.signLanguage.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import signLanguage.signLanguage.model.Member;
import signLanguage.signLanguage.service.MemberService;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // 원하는 출처 및 필요한 옵션을 설정
public class SessionController {

    private final MemberService memberService;

    @GetMapping("/api/session")
    public Object getSession(HttpServletRequest request) {
        System.out.println("--------------------");
        System.out.println("세션 정보 호출 API 실행");

        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("sessionId")) {
                    String sessionId = cookie.getValue();
                    System.out.println("요청 헤더에 포함된 쿠키로부터 얻은 sessionId : " + sessionId);
                }
            }
        }
        HttpSession session = request.getSession();
        Long memberId = (Long) session.getAttribute("memberId");
        System.out.println("session.getID() : " + session.getId());

        if (session != null) {
            // 로그인 상태인 경우 로그인 멤버 객체를 응답으로 전송합니다.
            Member loginMember = memberService.findMember(memberId);

            //필요한 정보를 맵 형태로 응답
            Map<String, Object> userInfo = new HashMap<>();
            userInfo.put("name", loginMember.getName());
            userInfo.put("email", loginMember.getEmail());
            userInfo.put("memberId", memberId);
            System.out.println("UserInfo : " + loginMember);

            return userInfo;
        } else {
            // 로그인되지 않은 경우
            return ResponseEntity.badRequest().body("세션정보 요청 실패.");
        }
    }

    @GetMapping("/api/sessionId")
    public String GetSessionId(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        String sessionId = "";
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("sessionId")) {
                    sessionId = cookie.getValue();
                    System.out.println("요청 헤더에 포함된 쿠키로부터 얻은 sessionId : " + sessionId);
                }
            }
        }
        return sessionId;
    }
}

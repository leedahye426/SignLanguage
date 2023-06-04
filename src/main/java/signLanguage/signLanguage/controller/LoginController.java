package signLanguage.signLanguage.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import signLanguage.signLanguage.model.Member;
import signLanguage.signLanguage.service.MemberService;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@RestController
@RequiredArgsConstructor
public class LoginController {

    private final MemberService memberService;
    private final JdbcTemplate jdbcTemplate;
//    @GetMapping("/members/loginForm")
//    public String loginForm() {
//        System.out.println("로그인 페이지 입니다.");
//        return "member/login";
//    }

    @PostMapping("/api/login")
    public ResponseEntity<?> login(@RequestBody Member member, HttpServletRequest request, HttpServletResponse response) {

        System.out.println("email : " + member.getEmail());
        System.out.println("passwd : " + member.getPasswd());
        //로그인 로직
        Member loginMember = memberService.login(member.getEmail(), member.getPasswd());
        System.out.println("loginMember : " + loginMember);

        if (loginMember == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("잘못된 이메일 혹은 비밀번호를 입력하였습니다.");
        } else {
            HttpSession session = request.getSession(true);
            session.setAttribute("memberId", loginMember.getMemberId());
            Cookie sessionCookie = new Cookie("sessionId", session.getId());
            sessionCookie.setMaxAge(3600);
            response.addCookie(sessionCookie);
            System.out.println("sessionID : " + session.getId());
//            response.setHeader("Session-ID", session.getId());
            return ResponseEntity.ok().body(session.getId());
        }


    }

    @PostMapping("/api/logout")
    public String logout(HttpSession session) {
        // 로그아웃 시 세션 삭제
        session.invalidate();
        return "redirect:/";
    }


}

package signLanguage.signLanguage;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import signLanguage.signLanguage.model.Member;
import signLanguage.signLanguage.service.MemberService;

public class MemberUtils {
    public static Member getLoginMember(MemberService memberService) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Long memberId = Long.parseLong(auth.getName());
        Member member = memberService.findMember(memberId);
        return member;
    }
}

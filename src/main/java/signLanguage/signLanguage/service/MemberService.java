package signLanguage.signLanguage.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import signLanguage.signLanguage.model.Member;
import signLanguage.signLanguage.repository.MemberRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;

    public Member join(Member member) {
        Optional<Member> existingMember = Optional.ofNullable(memberRepository.findByEmail(member.getEmail()));
        if(existingMember.isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        return memberRepository.save(member);
    }
    public Member findMember(long memberId) {
        System.out.println("findMember()");
        return memberRepository.findById(memberId);
    }

    public List<Member> findMembers() {
        return memberRepository.findAll();
    }

    public boolean existCheck(String email, String passwd) {
        if(memberRepository.loginCheck(email, passwd).isPresent()) {
            return true;
        }
        return false;
    }
}

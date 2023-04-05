package signLanguage.signLanguage.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import signLanguage.signLanguage.model.Member;
import signLanguage.signLanguage.repository.MemberRepository;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;

    public Member findMember(long memberId) {
        System.out.println("findMember()");
        return memberRepository.findById(memberId);
    }

    public List<Member> findMembers() {
        return memberRepository.findAll();
    }
}

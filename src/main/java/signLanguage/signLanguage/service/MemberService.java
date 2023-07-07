package signLanguage.signLanguage.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import signLanguage.signLanguage.model.Member;
import signLanguage.signLanguage.repository.MemberRepository;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {
    private final BCryptPasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;

    public Member join(Member member) {
        Optional<Member> existingMember =
                Optional.ofNullable(memberRepository.findByEmail(member.getEmail()));
        if (existingMember.isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        return memberRepository.save(member);
    }

    public Member findMember(long memberId) {
        System.out.println("findMember()");
        return memberRepository.findById(memberId);
    }

    public Member findByEmail(String email) {
        return memberRepository.findByEmail(email);
    }

    public List<Member> findMembers() {
        return memberRepository.findAll();
    }

//    public boolean existCheck(String email, String passwd) {
//        if(memberRepository.loginCheck(email, passwd).isPresent()) {
//            return true;
//        }
//        return false;
//    }

    public Member login(String email, String passwd) {
        Member member = memberRepository.findByEmail(email);
        if (member == null) {
            // 해당 이메일의 멤버가 존재하지 않으면 예외 처리
            return null;
        } else if (passwordEncoder.matches(passwd, member.getPasswd())) {
            return member;
        } else return null;
    }

//    @Override
//    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//        Member member = memberRepository.findByEmail(email);
//        if (member == null) {
//            throw new UsernameNotFoundException("Invalid email or password.");
//        }
//        List<GrantedAuthority> authorities = new ArrayList<>();
//        // 사용자의 권한(role)을 설정하는 부분
//        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
//        return new User(member.getEmail(), member.getPasswd(), authorities);
//    }
}

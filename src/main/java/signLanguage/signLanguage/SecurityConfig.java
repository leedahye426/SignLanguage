package signLanguage.signLanguage;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import signLanguage.signLanguage.service.MemberService;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {


    @Bean // HTTP 요청에 대한 인가 규칙
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        return http.csrf().disable()
//                .authorizeRequests()
//                .antMatchers("/login", "/signup","/home").permitAll() //인증되지 않은 모든 사용자에게 허용
//                .anyRequest().authenticated()
//                .and()
//                .formLogin()
//                .loginPage("/login") // 인가되지 않은 사용자에게 보여줄 페이지
//                .defaultSuccessUrl("/")
//                .permitAll()
//                .and()
//                .logout()
//                .logoutUrl("/logout") //로그아웃 요청을 처리할 경로
//                .permitAll()
//                .and()
//                .build();// 폼 인증에서는 CSRF 보안 설정을 비활성화해야 함
        return http.authorizeRequests().anyRequest().permitAll().and().csrf().disable().build();
    }

//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.userDetailsService(memberService)
//                .passwordEncoder(passwordEncoder());
//    }
    @Bean
    public BCryptPasswordEncoder  passwordEncoder() {
        // BCryptPasswordEncoder 인코더를 반환하여 비밀번호를 안전하게 저장
        return new BCryptPasswordEncoder();
    }


    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/**");
    }
}

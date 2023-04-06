package signLanguage.signLanguage.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import signLanguage.signLanguage.model.Member;
import signLanguage.signLanguage.model.Sign;
import signLanguage.signLanguage.service.MemberService;
import signLanguage.signLanguage.service.SignService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class HomeController {
    private final SignService signService;
    @GetMapping("/")
    public Map<String,Object> home() {
        Map<String, Object> dataMap = new HashMap<>();

        //랜덤으로 오늘의 수어 가져오기
        int limit = 2; //랜덤 갯수
        List<Sign> randomSigns = signService.findRandomSigns(limit);
        dataMap.put("randomSigns", randomSigns);

        return dataMap;
    }
}

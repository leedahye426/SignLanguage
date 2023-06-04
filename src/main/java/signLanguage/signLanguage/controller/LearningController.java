package signLanguage.signLanguage.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import signLanguage.signLanguage.model.Category;
import signLanguage.signLanguage.model.Complete;
import signLanguage.signLanguage.model.Member;
import signLanguage.signLanguage.model.Sign;
import signLanguage.signLanguage.repository.CompleteRepository;
import signLanguage.signLanguage.service.CategoryService;
import signLanguage.signLanguage.service.MemberService;
import signLanguage.signLanguage.service.SignService;

import javax.servlet.http.HttpServletRequest;
import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class LearningController {

    private final CategoryService categoryService;
    private final MemberService memberService;
    private final SignService signService;
    private final CompleteRepository completeRepository;
    @GetMapping("/api/learning")
    public List<Category> learningPage() {
        Map<String, Object> dataMap = new HashMap<>();

        //카테고리
        List<Category> categories = categoryService.findCategories();

        return categories;
    }

    @GetMapping("/api/learning/{categoryId}")
    public List<Sign> category(@PathVariable("categoryId") Long categoryId) {
        Map<String, Object> dataMap = new HashMap<>();

//        Member loginMember = MemberUtils.getLoginMember(memberService);
//
//        //카테고리
//        List<Category> categories = categoryService.findCategories();
//        dataMap.put("categories", categories);

        //해당 카테고리에 속한 수어 list
        List<Sign> signs = signService.findByCategory(categoryId);


        return signs;
    }

    @GetMapping("/api/learning/signId/{signId}")
    public Sign sign(@PathVariable("signId") Long signId) {
        Map<String, Object> dataMap = new HashMap<>();

        //해당 수어
        Sign sign = signService.findSign(signId);
        dataMap.put("sign", sign);

        return sign;
    }

    @PostMapping("/api/complete")
    public void learning_complete(@RequestBody Complete complete) {
        //필요한 데이터 : memberId, signId, categoryId
        System.out.println("memberID: "+complete.getMemberId());
        System.out.println("signId: "+complete.getSignId());
        System.out.println("categoryID: "+complete.getCategoryId());


        System.out.println("complete : "+complete.getNum());
        Long id = completeRepository.save(complete);
    }

    @GetMapping("/api/progress")
    public Double learning_progress(@RequestParam("categoryId") Long categoryId, @RequestParam("memberId") Long memberId) {
        int signCnt = signService.findByCategory(categoryId).size();
        int completeCnt = completeRepository.findComplete(categoryId, memberId).size();
        Double percent = completeCnt / (double) signCnt * 100;

        DecimalFormat decimalFormat = new DecimalFormat("#.##");
        String formattedPercent = decimalFormat.format(percent);

        return Double.parseDouble(formattedPercent);
    }

    @PostMapping("/api/check-duplicate")
    public ResponseEntity<Map<String, Boolean>> checkDuplicate(@RequestBody Complete complete) {
        System.out.println("/api/check-duplicate 요청");
        System.out.println("memberId"+complete.getMemberId());
        System.out.println("signId"+complete.getSignId());

        Long memberId = complete.getMemberId();
        Long signId = complete.getSignId();

        boolean isDuplicate = completeRepository.checkDuplicate(memberId, signId) != null;
        Map<String, Boolean> response = new HashMap<>();
        response.put("duplicate", isDuplicate);
        return ResponseEntity.ok(response);
    }
}

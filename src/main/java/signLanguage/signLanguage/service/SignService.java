package signLanguage.signLanguage.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import signLanguage.signLanguage.model.Sign;
import signLanguage.signLanguage.repository.SignRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SignService {

    private final SignRepository signRepository;

    public List<Sign> findSigns() {
        return signRepository.findAll();
    }


    public List<Sign> findRandomSigns(int limit) {
        return signRepository.findRandomSigns(limit);
    }
}

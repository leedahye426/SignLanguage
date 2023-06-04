package signLanguage.signLanguage.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name = "sign")
@Table
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Sign {

    @Id//기본키 지정
    @GeneratedValue
    private Long signId;
    private Long categoryId;
    private String word;
    private String videoName;
    private String videoPath;
    private String imgName;
    private String imgPath;
    private String content;


}

package ee.epolice;

import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@RestController
public class Controller {
    private List<Person> personList = new ArrayList<>();
    @PostMapping(value = "/addAppForm")
    public List<Person> addAppForm(HttpServletRequest request) throws ParseException {
        Person person = new Person();
        person.setPersonalCode(request.getParameter("personal_code"));
        person.setFirstName(request.getParameter("first_name"));
        person.setLastName(request.getParameter("first_name"));
        DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        person.setBirthday(dateFormat.parse(request.getParameter("birthday")));
        person.setAddress(request.getParameter("address"));
        person.setEmail(request.getParameter("email"));
        personList.add(person);
        return personList;
    }
}

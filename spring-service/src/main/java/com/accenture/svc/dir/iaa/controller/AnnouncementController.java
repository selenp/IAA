package com.accenture.svc.dir.iaa.controller;

import com.accenture.svc.dir.iaa.XlsxUtils;
import com.accenture.svc.dir.iaa.XlsxWriter;
import com.accenture.svc.dir.iaa.entity.Admin;
import com.accenture.svc.dir.iaa.entity.Announcement;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.persistence.criteria.Predicate;

@Controller
@CrossOrigin(
        allowCredentials = "true",
        origins = "*",
        methods = {RequestMethod.GET, RequestMethod.HEAD, RequestMethod.OPTIONS, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE},
        allowedHeaders = {"Access-Control-Allow-Headers", "Origin,Accept", "X-Requested-With", "Content-Type", "Access-Control-Request-Method", "Access-Control-Request-Headers", "Authorization", "Cache-Control"}
)
@RequestMapping(path = "/api/announcement")
public class AnnouncementController extends AbstractController {

    @DeleteMapping(path = "/{id}")
    public @ResponseBody
    void delete(@PathVariable Integer id) {
        announcementRepository.deleteById(id);
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody
    Optional<Announcement> get(@PathVariable Integer id) {
        return announcementRepository.findById(id);
    }

    /**
     * Create or Modify
     */
    @PostMapping(path = "/")
    public @ResponseBody
    Announcement post(
            @RequestBody Announcement d) {
        announcementRepository.save(d);
        return d;
    }

    /**
     * User Pagination
     */
    @GetMapping(path = "/")
    public @ResponseBody
    Object getAll(
            @RequestHeader("Authorization") String authorization,
            @RequestParam(required = false) String eid,
            @RequestParam(required = false) String deleteFlag,
            @RequestParam(required = false, defaultValue = "false") boolean xlsx,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int size) throws IOException {
        Admin admin = ensureAuthorization(adminRepository, authorization);
        Specification<Announcement> spec = (root, query, cb) -> {
            List<Predicate> orList = new ArrayList<>();
            orList.add(cb.equal(root.get("eid").as(String.class), admin.getUserid()));

            String[] roles = admin.getRoles().split(",");
            for (String role : roles) {
                orList.add(cb.equal(root.get("assignToRole").as(String.class), role));
            }
            Predicate[] p1 = new Predicate[orList.size()];
            Predicate or = cb.or(orList.toArray(p1));

            List<Predicate> list = new ArrayList<>();
            list.add(or);

            if (!StringUtils.isEmpty(eid)) {
                list.add(cb.equal(root.get("eid").as(String.class), eid));
            }
            if (!StringUtils.isEmpty(deleteFlag)) {
                list.add(cb.equal(root.get("deleteFlag").as(Boolean.class), Boolean.valueOf(deleteFlag)));
            }

            Predicate[] p2 = new Predicate[list.size()];
            query.where(cb.and(list.toArray(p2)));
            return query.getRestriction();
        };
        if (xlsx) {
            Iterable<Announcement> announcements = announcementRepository.findAll(spec);
            String fileName = "poi-generated-announcement.xlsx";
            XlsxUtils.write2Xlsx(new File(ofPath, fileName), new XlsxWriter<Announcement>() {
                @Override
                public String[] getHeaders() {
                    return new String[]{
                            "EID",
                            "日期",
                            "内容",
                    };
                }

                @Override
                public Iterable<Announcement> getIterableData() {
                    return announcements;
                }

                @Override
                public Object getValue(int colIndex, Announcement data) {
                    switch (colIndex) {
                        case 0:
                            return data.getEid();
                        case 1:
                            return data.getCreatedDate();
                        case 2:
                            return data.getContent();
                        default:
                            return "";
                    }
                }
            });

            Map<String, String> map = new HashMap();
            map.put("fileName", fileName);
            return map;
        } else {
            PageRequest pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("id")));
            Page<Announcement> announcements = this.announcementRepository.findAll(spec, pageable);
            return announcements;
        }
    }

}

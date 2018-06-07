package com.accenture.svc.dir.iaa.controller;

import com.accenture.svc.dir.iaa.entity.AssetTagHistory;
import com.accenture.svc.dir.iaa.entity.Delivery;
import com.accenture.svc.dir.iaa.entity.TransferEvent;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.Predicate;

@Controller
@CrossOrigin(
        allowCredentials = "true",
        origins = "*",
        methods = {RequestMethod.GET, RequestMethod.HEAD, RequestMethod.OPTIONS, RequestMethod.POST, RequestMethod.DELETE},
        allowedHeaders = {"Access-Control-Allow-Headers", "Origin,Accept", "X-Requested-With", "Content-Type", "Access-Control-Request-Method", "Access-Control-Request-Headers", "Authorization", "Cache-Control"}
)
@RequestMapping(path = "/api/assettag")
public class AssetTagController extends AbstractController {
    /**
     * Pagination
     */
    @GetMapping(path = "/{assetTag}")
    public @ResponseBody
    List<AssetTagHistory> getAll(
            @PathVariable String assetTag,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int size) {
        List<TransferEvent> transferEvents = this.transferEventRepository.findAll((Specification<TransferEvent>) (root, query, cb) -> {
            List<Predicate> list = new ArrayList<>();
            list.add(cb.like(root.get("assetTags").as(String.class), "%" + assetTag + "%"));

            Predicate[] p2 = new Predicate[list.size()];
            query.where(cb.and(list.toArray(p2)));
            return query.getRestriction();
        });
        List<Delivery> deliverys = this.deliveryRepository.findAll((Specification<Delivery>) (root, query, cb) -> {
            List<Predicate> list = new ArrayList<>();
            list.add(cb.equal(root.get("assetTag").as(String.class), assetTag));

            Predicate[] p2 = new Predicate[list.size()];
            query.where(cb.and(list.toArray(p2)));
            return query.getRestriction();
        });

        List<AssetTagHistory> his = new ArrayList<>(deliverys.size());
        for (Delivery delivery:deliverys) {
            his.addAll(AssetTagHistory.from(delivery));
        }
        for (TransferEvent transferEvent:transferEvents) {
            his.add(AssetTagHistory.from(transferEvent));
        }
        return his;
    }

}

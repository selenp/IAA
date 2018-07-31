package com.accenture.svc.dir.iaa.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Table;

@Entity
@Table(indexes = {
        @Index(name = "IDX_Delivery_eid", columnList = "eid"),
})
public class Delivery {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String progress; //borrow, return
    //	姓名(EID)
    private String eid;
    //  项目名 Project Name
    private String projectName;
    //  部门 Business Unit
    private String businessUnit;
    //  楼号 Location
    private String locationBuilding;
    private String locationSeat;
    //  日期 Effective Date
    private String borrowDate;

    private String machineType;
    //	资产编号Asset Tag
    private String assetTag;
    //  序列号Serial Tag
    private String serialTag;
    //	笔记本型号Laptop Model
    private String laptopModel;
    private String monitorSize;
    //	电源适配器&电源线 AC Power Adapter & Power cord(TBD)
    private Boolean acPowerAdapter;
    //	电脑锁 Security Cable (210CNY)
    private Boolean securityCable;
    //	电脑包 Bag(174CNY)
    private Boolean bag;
    //	鼠标 Mouse(105CNY)
    private Boolean mouse;
    //	键盘 鼠标
    private Boolean mouseKeyboard;
    //	网线 Lan Cable(10CNY/M)
    private Boolean lanCable;
    //	签名图片 signature_image
    private String signatureImage;
    private String returnMonitorSize;
    //	键盘 鼠标
    private Boolean returnMouseKeyboard;
    //	电源适配器&电源线 AC Power Adapter & Power cord(TBD)
    private Boolean returnAcPowerAdapter;
    //	电脑锁 Security Cable (210CNY)
    private Boolean returnSecurityCable;
    //	电脑包 Bag(174CNY)
    private Boolean returnBag;
    //	鼠标 Mouse(105CNY)
    private Boolean returnMouse;
    //	网线 Lan Cable(10CNY/M)
    private Boolean returnLanCable;
    //	签名图片 signature_image
    private String returnSignatureImage;
    //  返还人 returned_by
    private String returnBy;
    //	日期 return_date
    private String returnDate;
    //	接受人 received_by
    private String receivedBy;
    //	单号 reference_number
    private String referenceNumber;
    //	备注 remarks
    private String remarks;
    //	备注 peripheralModel
    private String peripheralModel;

    public String getPeripheralModel() {
        return peripheralModel;
    }

    public void setPeripheralModel(String peripheralModel) {
        this.peripheralModel = peripheralModel;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProgress() {
        return progress;
    }

    public void setProgress(String progress) {
        this.progress = progress;
    }

    public String getEid() {
        return eid;
    }

    public void setEid(String eid) {
        this.eid = eid;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getBusinessUnit() {
        return businessUnit;
    }

    public void setBusinessUnit(String businessUnit) {
        this.businessUnit = businessUnit;
    }

    public String getLocationBuilding() {
        return locationBuilding;
    }

    public void setLocationBuilding(String locationBuilding) {
        this.locationBuilding = locationBuilding;
    }

    public String getLocationSeat() {
        return locationSeat;
    }

    public void setLocationSeat(String locationSeat) {
        this.locationSeat = locationSeat;
    }

    public String getBorrowDate() {
        return borrowDate;
    }

    public void setBorrowDate(String borrowDate) {
        this.borrowDate = borrowDate;
    }

    public String getAssetTag() {
      return assetTag == null ? "" : assetTag;
    }

    public void setAssetTag(String assetTag) {
        this.assetTag = assetTag;
    }

    public String getSerialTag() {
        return serialTag;
    }

    public void setSerialTag(String serialTag) {
        this.serialTag = serialTag;
    }


    public void setLaptopModel(String laptopModel) {
        this.laptopModel = laptopModel;
    }

    public Boolean isAcPowerAdapter() {
        return acPowerAdapter;
    }

    public Boolean isSecurityCable() {
        return securityCable;
    }

    public Boolean isBag() {
        return bag;
    }

    public Boolean isMouse() {
        return mouseKeyboard;
    }

    public Boolean isLanCable() {
        return lanCable;
    }

    public String getSignatureImage() {
        return signatureImage;
    }

    public void setSignatureImage(String signatureImage) {
        this.signatureImage = signatureImage;
    }

    public String getReturnBy() {
        return returnBy;
    }

    public void setReturnBy(String returnBy) {
        this.returnBy = returnBy;
    }

    public String getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(String returnDate) {
        this.returnDate = returnDate;
    }

    public String getReceivedBy() {
        return receivedBy;
    }

    public void setReceivedBy(String receivedBy) {
        this.receivedBy = receivedBy;
    }

    public String getReferenceNumber() {
        return referenceNumber;
    }

    public void setReferenceNumber(String referenceNumber) {
        this.referenceNumber = referenceNumber;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public Boolean getAcPowerAdapter() {
        return acPowerAdapter;
    }

    public void setAcPowerAdapter(Boolean acPowerAdapter) {
        this.acPowerAdapter = acPowerAdapter;
    }

    public Boolean getSecurityCable() {
        return securityCable;
    }

    public void setSecurityCable(Boolean securityCable) {
        this.securityCable = securityCable;
    }

    public Boolean getBag() {
        return bag;
    }

    public void setBag(Boolean bag) {
        this.bag = bag;
    }

    public Boolean getMouseKeyboard() {
        return mouseKeyboard;
    }

    public void setMouseKeyboard(Boolean mouseKeyboard) {
        this.mouseKeyboard = mouseKeyboard;
    }

    public Boolean getLanCable() {
        return lanCable;
    }

    public void setLanCable(Boolean lanCable) {
        this.lanCable = lanCable;
    }

    public Boolean getReturnAcPowerAdapter() {
        return returnAcPowerAdapter;
    }

    public void setReturnAcPowerAdapter(Boolean returnAcPowerAdapter) {
        this.returnAcPowerAdapter = returnAcPowerAdapter;
    }

    public Boolean getReturnSecurityCable() {
        return returnSecurityCable;
    }

    public void setReturnSecurityCable(Boolean returnSecurityCable) {
        this.returnSecurityCable = returnSecurityCable;
    }

    public Boolean getReturnBag() {
        return returnBag;
    }

    public void setReturnBag(Boolean returnBag) {
        this.returnBag = returnBag;
    }

    public Boolean getReturnMouse() {
        return returnMouse;
    }

    public void setReturnMouse(Boolean returnMouse) {
        this.returnMouse = returnMouse;
    }

    public Boolean getReturnLanCable() {
        return returnLanCable;
    }

    public void setReturnLanCable(Boolean returnLanCable) {
        this.returnLanCable = returnLanCable;
    }

    public String getReturnSignatureImage() {
        return returnSignatureImage;
    }

    public void setReturnSignatureImage(String returnSignatureImage) {
        this.returnSignatureImage = returnSignatureImage;
    }

    public String getMachineType() {
        return machineType;
    }

    public void setMachineType(String machineType) {
        this.machineType = machineType;
    }

    public String getLocation() {
        return String.format("%s-%s", locationBuilding, locationSeat);
    }

    public String getLaptopModel() {
        return laptopModel;
    }

    public Boolean getMouse() {
        return mouse;
    }

    public void setMouse(Boolean mouse) {
        this.mouse = mouse;
    }

    public String getMonitorSize() {
        return monitorSize;
    }

    public void setMonitorSize(String monitorSize) {
        this.monitorSize = monitorSize;
    }

    public String getReturnMonitorSize() {
        return returnMonitorSize;
    }

    public void setReturnMonitorSize(String returnMonitorSize) {
        this.returnMonitorSize = returnMonitorSize;
    }

    public Boolean getReturnMouseKeyboard() {
        return returnMouseKeyboard;
    }

    public void setReturnMouseKeyboard(Boolean returnMouseKeyboard) {
        this.returnMouseKeyboard = returnMouseKeyboard;
    }

    public String toReadable() {
        return "assetTag: " + assetTag;
    }
}


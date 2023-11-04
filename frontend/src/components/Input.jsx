import React from "react";

export const Input = ({
  nameText,
  setNameText,
  purchaseDate,
  setPurchaseDate,
  handleFileUpload,
}) => {
  return (
    <div className="text-secondary fs-6 fw-bold ">
      <div className="m-3">
        <label className="mx-3">名称</label>
        <input
          id="home-appliance-name"
          type="text"
          className="form-control-sm"
          placeholder="家電の名称を入力"
          value={nameText}
          onChange={(event) => setNameText(event.target.value)}
        />
      </div>
      <div className="m-3">
        <label className="mx-3">購入年月日</label>
        <input
          id="purchase-date"
          type="date"
          className="form-control-sm"
          placeholder="購入年月日を入力"
          value={purchaseDate}
          onChange={(event) => setPurchaseDate(event.target.value)}
        />
      </div>
      <div className="m-3">
        <label className="mx-3">保証書</label>
        <input
          type="file"
          className="form-control-sm "
          id="warrantyfile"
          onChange={handleFileUpload}
        />
      </div>
    </div>
  );
};

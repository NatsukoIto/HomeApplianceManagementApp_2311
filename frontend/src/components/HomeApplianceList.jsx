import React from "react";

export const HomeApplianceList = ({ homeAppliances, onCheckboxChange }) => {
  const handleCheckboxChange = (event, id) => {
    // チェックボックスの変更時に呼び出され、選択したアイテムの情報を `onCheckboxChange` ハンドラを介して親コンポーネントに渡す
    if (event.target.checked) {
      // チェックが入った場合、選択されたアイテムを追加
      onCheckboxChange((prevSelectedItems) => [...prevSelectedItems, id]);
    } else {
      // チェックが外れた場合、選択されたアイテムを削除
      onCheckboxChange((prevSelectedItems) =>
        prevSelectedItems.filter((itemId) => itemId !== id)
      );
    }
  };

  return (
    <div className="table-responsive homeAppliance-list">
      <table className="table table-striped table-hover table-sm">
        <thead>
          <tr>
            <th scope="col">選択</th>
            <th scope="col">No</th>
            <th scope="col">名称</th>
            <th scope="col">購入年月日</th>
            <th scope="col">保証書</th>
          </tr>
        </thead>

        <tbody>
          {homeAppliances.map((appliance, index) => (
            <tr key={appliance.id}>
              <td>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`check${appliance.id}`}
                    onChange={(event) =>
                      handleCheckboxChange(event, appliance.id)
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`check${appliance.id}`}
                  ></label>
                </div>
              </td>
              <th scope="row">{index + 1}</th>
              <td>{appliance.homeappliance_name}</td>
              <td>{appliance.purchase_date}</td>
              <td>
                {" "}
                {appliance.file ? (
                  <a
                    href={URL.createObjectURL(appliance.warranty_data)}
                    download={appliance.file.name}
                  >
                    {appliance.file.name}
                  </a>
                ) : (
                  "ファイルなし"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

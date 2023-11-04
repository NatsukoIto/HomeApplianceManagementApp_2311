import React, { useEffect, useState } from "react";
import { Input } from "./components/Input";
import { HomeApplianceList } from "./components/HomeApplianceList";
import { Modal, Button } from "react-bootstrap";
import "./App.css";

const API_URL = "http://localhost:3000/homeappliancelists";

export const App = () => {
  const [nameText, setNameText] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  // データリストのUseState
  const [homeAppliances, setHomeAppliances] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]); // 削除対象アイテムのIDを格納
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchlist();
  }, []);

  const fetchlist = () => {
    fetch(API_URL)
      .then((responseData) => responseData.json())
      .then((result) => {
        setHomeAppliances(result);
      });
  };

  const handleAddHomeAppliance = () => {
    if (nameText.trim() === "" || purchaseDate.trim() === "") {
      return;
    }

    const newHomeAppliance = {
      // id: homeAppliances.length + 1,
      homeappliance_name: nameText,
      purchase_date: purchaseDate,
      warranty_data: selectedFile,
    };

    // バックエンドにデータを送信
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newHomeAppliance),
    })
      .then(() => {
        // データの追加が成功したら、データを再取得して表示を更新
        fetchlist();
      })
      .catch((error) => {
        console.error("データの追加エラー:", error);
      });

    setHomeAppliances([...homeAppliances, newHomeAppliance]);
    setNameText("");
    setPurchaseDate("");
    setSelectedFile(null);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedItems.length === 0) {
      return;
    }

    fetch(API_URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedItems),
    })
      .then(() => {
        fetchlist();
      })
      .catch((error) => {
        console.error("データの削除エラー:", error);
      });

    setSelectedItems([]);
    setShowDeleteModal(false);

    //   const updatedHomeAppliances = homeAppliances.filter(
    //     (appliance) => !selectedItems.includes(appliance.id)
    //   );
    //   setHomeAppliances(updatedHomeAppliances);
    //   setSelectedItems([]);
    //   setShowDeleteModal(false);
    // };
  };

  const handleDeleteCancel = () => {
    setSelectedItems([]);
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="card">
        <div className="card-header bg-warning text-dark bg-opacity-50">
          <p className="text-secondary fs-2 fw-bold">家電アプリ</p>
          <Input
            nameText={nameText}
            setNameText={setNameText}
            purchaseDate={purchaseDate}
            setPurchaseDate={setPurchaseDate}
            handleFileUpload={handleFileUpload}
          />
        </div>
        <div className="bg-warning text-dark bg-opacity-50">
          <button
            className="btn btn-secondary mx-2"
            type="button"
            onClick={handleAddHomeAppliance}
          >
            登録
          </button>
          <button className="btn btn-secondary mx-2" type="button">
            編集
          </button>
          <button
            className="btn btn-secondary mx-2"
            type="button"
            onClick={handleDelete}
          >
            削除
          </button>
        </div>
        <HomeApplianceList
          homeAppliances={homeAppliances}
          onCheckboxChange={setSelectedItems}
        />
      </div>

      <Modal show={showDeleteModal} onHide={handleDeleteCancel}>
        <Modal.Header closeButton>
          <Modal.Title>削除の確認</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {`選択した${selectedItems.length} 件削除します。よろしいですか？`}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteCancel}>
            いいえ
          </Button>
          <Button variant="primary" onClick={handleDeleteConfirm}>
            はい
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

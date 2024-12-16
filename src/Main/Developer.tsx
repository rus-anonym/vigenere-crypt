import { Avatar } from "@consta/uikit/Avatar";
import { Button } from "@consta/uikit/Button";
import { Card } from "@consta/uikit/Card";
import { Modal } from "@consta/uikit/Modal";
import { Text } from "@consta/uikit/Text";
import React from "react";

import avatar from "../PNG/avatar.png";
import github from "../PNG/github.png";

const DeveloperModal = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div>
      <Button
        size="m"
        view="ghost"
        label="О программе"
        width="default"
        form="round"
        onClick={() => setIsModalOpen(true)}
      />
      <Modal
        isOpen={isModalOpen}
        hasOverlay
        onClickOutside={() => setIsModalOpen(false)}
        onEsc={() => setIsModalOpen(false)}
      >
        <Card verticalSpace="m" horizontalSpace="m">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Avatar url={avatar} size="l" />
            <div style={{ padding: "5px" }} />
            <Text weight="bold">Александр Сёмин</Text>
            <Text weight="semibold">15.27Д-ИБ06у/24б</Text>
            <div style={{ padding: "7px" }} />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Avatar url={github} size="m" />
              <div style={{ padding: "5px" }} />
              <Text
                view="link"
                cursor="pointer"
                onClick={() => {
                  const elem = document.createElement("a");
                  elem.href = "https://github.com/rus-anonym/vigenere-crypt";
                  elem.target = "_blank";
                  elem.click();
                  elem.remove();
                }}
              >
                Репозиторий на GitHub
              </Text>
            </div>
          </div>
          <div style={{ padding: "10px" }} />
          <div>
            <Button
              size="m"
              view="primary"
              label="Закрыть"
              width="full"
              onClick={() => setIsModalOpen(false)}
            />
          </div>
        </Card>
      </Modal>
    </div>
  );
};

export default DeveloperModal;

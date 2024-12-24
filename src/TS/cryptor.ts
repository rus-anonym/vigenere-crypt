class VigenereCipher {
  private readonly _datasets = {
    english: "abcdefghijklmnopqrstuvwxyz",
    russian: "абвгдеёжзийклмнопрстуфхцчшщъыьэюя",
  };

  public isValidValue(
    value: string,
    dataset: keyof VigenereCipher["_datasets"]
  ): boolean {
    if (value.length === 0) {
      return false;
    }

    for (const char of value.toLowerCase()) {
      if (!this._datasets[dataset].includes(char)) {
        return false;
      }
    }

    return true;
  }

  public encrypt(
    plainText: string,
    key: string,
    dataset: keyof VigenereCipher["_datasets"]
  ): string {
    const cipherText = [];
    let index = 0;

    for (let i = 0; i < plainText.length; i++) {
      const charCode = this._datasets[dataset].indexOf(
        plainText[i].toLowerCase()
      );
      if (charCode === -1) {
        continue;
      }
      const keyCharCode = this._datasets[dataset].indexOf(
        key[index % key.length].toLowerCase()
      );

      cipherText.push(this.getEncryptedChar(charCode, keyCharCode, dataset));
      index++;
    }

    return cipherText.join("");
  }

  public decrypt(
    cipherText: string,
    key: string,
    dataset: keyof VigenereCipher["_datasets"]
  ): string {
    const plainText = [];
    let index = 0;

    for (let i = 0; i < cipherText.length; i++) {
      const charCode = this._datasets[dataset].indexOf(
        cipherText[i].toLowerCase()
      );
      if (charCode === -1) {
        continue;
      }
      const keyCharCode = this._datasets[dataset].indexOf(
        key[index % key.length].toLowerCase()
      );

      plainText.push(this.getDecryptedChar(charCode, keyCharCode, dataset));
      index++;
    }

    return plainText.join("");
  }

  private getEncryptedChar(
    plainCharCode: number,
    keyCharCode: number,
    dataset: keyof VigenereCipher["_datasets"]
  ): string {
    const shift =
      (plainCharCode + keyCharCode) % this._datasets[dataset].length;
    return this._datasets[dataset].charAt(shift);
  }

  private getDecryptedChar(
    cipherCharCode: number,
    keyCharCode: number,
    dataset: keyof VigenereCipher["_datasets"]
  ): string {
    let plainCharCode =
      (cipherCharCode - keyCharCode) % this._datasets[dataset].length;

    if (plainCharCode < 0) {
      plainCharCode += this._datasets[dataset].length;
    }

    return this._datasets[dataset].charAt(plainCharCode);
  }
}

export default VigenereCipher;

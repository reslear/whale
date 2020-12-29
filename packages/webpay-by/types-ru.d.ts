
    /* 
      Auto generated Webpay types
      12/29/2020, 1:25:13 AM GMT+3
    */

    /** Поля формы оплаты */
    export interface IPayFields {
      
      /** Поле не содержит значения и обозначает тип запроса
       * @remarks 
      */
      "*scart": string;
     
      /** Идентификатор магазина в системе WEBPAY. Данный идентификатор создается при регистрации в системе WEBPAY и высылается в письме.
       * @remarks 
      */
      "wsb_storeid": string;
     
      /** Название магазина, которое будет отображаться на форме оплаты. По умолчанию берется из настроек биллинг-аккаунта.
       * @remarks Максимальная длина поля 64 символа.
      */
      "wsb_store"?: string;
     
      /** Уникальный идентификатор заказа, присваиваемый магазином.
       * @remarks Максимальная длина поля 64 символа. При оплате через ЕРИП значение поля не может начинаться на 0 (ноль).
      */
      "wsb_order_num": string;
     
      /** Идентификатор валюты. Буквенный трехзначный код валюты согласно ISO4271.
       * @remarks Допустимые значения: BYN, USD, EUR, RUB
      */
      "wsb_currency_id": string;
     
      /** Версия формы оплаты.
       * @remarks Текущий номер версии: 2
      */
      "wsb_version": string;
     
      /** Идентификатор языка формы оплаты.
       * @remarks Допустимые значения: russian, english. При отсутствии значения определяется по настройкам браузера.
      */
      "wsb_language_id"?: string;
     
      /** Случайная последовательность символов, участвующих в формировании подписи заказа.
       * @remarks Перейти к разделу: Электронная подпись заказа.
      */
      "wsb_seed": string;
     
      /** Контрольное значение (электронная подпись) заказа - результат выполнения функции SHA1 (для версии 2, см. поле wsb_version) либо MD5, если версия протокола не указана. Данное значение является hex-последовательностью. 
       * @remarks Перейти к разделу: Электронная подпись заказа.
      */
      "wsb_signature": string;
     
      /** URL адрес, на который возвращается покупатель в случае успешной оплаты.
       * @remarks К данному URL добавляются значения Идентификатора заказа (wsb_order_num) и номера транзакции (wsb_tid) в системе WEBPAY.
      */
      "wsb_return_url"?: string;
     
      /** URL адрес, на который возвращается покупатель в случае не успешной оплаты.
       * @remarks К данному URL добавляются значение Идентификатора заказа (wsb_order_num).
      */
      "wsb_cancel_return_url"?: string;
     
      /** 
                  Данный URL вызывается вне зависимости от того, был ли переход по URL в поле wsb_return_url или нет. Основное назначение этого URL оповестить сайт об успешной оплате в случае если пользователь не нажал кнопку "Вернуться на сайт" на форме оплаты. По умолчанию берется из настроек биллинг-аккаунта.
                  Внимание! Отправка нотификаторов возможна только на стандартные порты: 80 (http) и 443 (https)
                
       * @remarks Перейти к разделу: Извещение об оплате.
      */
      "wsb_notify_url"?: string;
     
      /** 
                  Поле, указывающее на проведение тестовой оплаты.
                  1 - производить тестовую оплату;
                  0 - производить реальную оплату.
                
       * @remarks В тестовой среде Sandbox значение данного поля должно быть равным 1.
      */
      "wsb_test": string;
     
      /** Наименование получателя товара/услуги.
       * @remarks Максимальная длина поля 255 символов.
      */
      "wsb_customer_name"?: string;
     
      /** Адрес получателя товара/услуги.
       * @remarks Максимальная длина поля 255 символов.
      */
      "wsb_customer_address"?: string;
     
      /** Сроки предоставления товаров/услуг/работ
       * @remarks Максимальная длина поля 255 символов.
      */
      "wsb_service_date"?: string;
     
    }
    /** Поля для формирования корзины товаров/услуг */
    export interface ICartFields {
      
      /** Наименование единицы товара.
       * @remarks Индекс {n}, должен начинаться с 0 и увеличиваться на 1 для каждой последующей позиции.
      */
      "wsb_invoice_item_name[{n}]": string;
     
      /** Количество единиц товара. Целое число, обозначающее количество единиц товара каждого наименования.
       * @remarks Индекс {n}, должен начинаться с 0 и увеличиваться на 1 для каждой последующей позиции.
      */
      "wsb_invoice_item_quantity[{n}]": string;
     
      /** Цена единицы товара. Число, определяющее стоимость каждой единицы товара (BYN, USD, EUR, RUB с 2 знаками после запятой или точки).
       * @remarks Индекс {n}, должен начинаться с 0 и увеличиваться на 1 для каждой последующей позиции.
      */
      "wsb_invoice_item_price[{n}]": string;
     
      /** Поле, значением, которого является сумма налога в белорусских рублях, добавляемая к общей сумме заказа.
       * @remarks При оплате через ЕРИП это поле не учитывается (сумма налога добавляется к сумме единицы товара).
      */
      "wsb_tax"?: string;
     
      /** Поле определяющее наименование (способ) доставки.
       * @remarks Максимальная длина поля 255 символов.
      */
      "wsb_shipping_name"?: string;
     
      /** Поле, значением которого является сумма доставки, добавляемая к общей сумме заказа.
       * @remarks 
      */
      "wsb_shipping_price"?: string;
     
      /** Поле с описанием скидки.
       * @remarks Максимальная длина поля 255 символов.
      */
      "wsb_discount_name"?: string;
     
      /** Поле, значением которого является сумма скидки, вычитаемая из общей суммы заказа.
       * @remarks Значение должно быть положительным числом (без знака "-" минус).
      */
      "wsb_discount_price"?: string;
     
      /** Поле содержит значение промокода скидки для заказа.
       * @remarks Максимальная длина поля 32 символа.
      */
      "wsb_discount_promo_code"?: string;
     
      /** 
                  Данное поле является вычисляемым. Значение этого поля является общей суммой оплаты заказа. Правила вычисления общей суммы:
                  wsb_total = wsb_invoice_item_quantity[0] * wsb_invoice_item_price[0] + wsb_invoice_item_quantity[1] * wsb_invoice_item_price[1] +
                  ...
                  wsb_invoice_item_quantity[n] * wsb_invoice_item_price[n] + wsb_tax + wsb_shipping_price - wsb_discount_price
                
       * @remarks Оплата не будет произведена, если wsb_total и посчитанное значение товаров не будет совпадать. Покупателю будет отображена ошибка.
      */
      "wsb_total": string;
     
    }
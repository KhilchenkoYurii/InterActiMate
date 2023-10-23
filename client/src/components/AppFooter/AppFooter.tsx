import Images from '../../assets/img'
import "./AppFooter.scss";


export const AppFooter = () => (
  <div className="app-footer flex justify-center items-center fixed left-0 bottom-0 z-50">
    <div className="text-xl	text-yellow-500 leading-4	font-black mx-2 hidden md:flex width-210">ВЕБСАЙТ ПРАЦЮЄ В ТЕСТОВОМУ РЕЖИМІ</div>
    <img src={Images.IAM} className="w-10 h-full" />
    <img src={Images.UpSHift} className="w-10 h-10" />
    <div className="flex items-start text-white disclaimer-mobile text-sm leading-3 md:mx-4 h-full md:w-1/2">
      Цей сайт був створений в межах програми UPSHIFT за підтримки ЮНІСЕФ та уряду Німеччини через німецький державний банк розвитку KfW. Його зміст є відповідальністю учасників  програми UPSHIFT та необов'язково відображає позицію ЮНІСЕФ, уряду Німеччини та німецького державного банку розвитку KfW.
    </div>
    <div className="text-xl	text-yellow-500	leading-4	font-black mx-2 hidden md:flex width-210">ВЕБСАЙТ ПРАЦЮЄ В ТЕСТОВОМУ РЕЖИМІ</div>
  </div>
);
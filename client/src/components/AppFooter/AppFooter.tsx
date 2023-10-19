import Images from '../../assets/img'
import "./AppFooter.scss";


export const AppFooter = () => (
  <div className="app-footer flex justify-center items-center fixed left-0 bottom-0">
    <div className="text-xl	text-yellow-500 leading-4	font-black mx-2 w-52">ВЕБСАЙТ ПРАЦЮЄ В ТЕСТОВОМУ РЕЖИМІ</div>
    <div className="h-10 w-10 rounded-full overflow-hidden hidden md:flex">
      <img src={Images.IAM} className="scale-150 w-10 h-10" />
    </div>
    <div className="text-white text-sm leading-3 md:mr-4 hidden md:flex">
      Проект створений в межах програми UPSHIFT за підтримки ЮНІСЕФ та уряду Німеччини через німецький державний банк розвитку KfW
    </div>
    <div className="text-white disclaimer-mobile flex md:hidden w-20">
      Cтворено в межах програми UPSHIFT
    </div>
    <img src={Images.UpSHift} className="w-10 h-10" />
    <div className="text-xl	text-yellow-500	leading-4	font-black mx-2 w-52 hidden md:flex">ВЕБСАЙТ ПРАЦЮЄ В ТЕСТОВОМУ РЕЖИМІ</div>
  </div>
);
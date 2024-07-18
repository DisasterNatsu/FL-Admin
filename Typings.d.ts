interface LogInResponseType {
  authToken: string;
  email: string;
  name: string;
}

interface NavState {
  open: boolean;
}

interface AuthState {
  email: string | null;
}

interface User {
  email: string;
  authenticated: boolean;
}

interface GameNamesTypes {
  title: string;
  value: string;
}

interface RechargeWithdrawType {
  _id: any;
  name: string | undefined;
  mobileNo: string | undefined;
  diamond: number;
  date: string;
  recharge: boolean;
  status: "Pending" | "Approved" | "Denied";
  createdAt: Date;
  screenshot?: string | undefined;
}

type statusType = "Pending" | "Approved" | "Denied";

interface ActiveItemModal {
  visible: boolean;
  setVisible: (state: boolean) => void;
  item: RechargeWithdrawType;
  fetchData: () => Promise<void>;
}

interface UserDetails {
  bankDetails?: {
    accountNo: string | undefined;
    bankName: string | undefined;
    ifsc: string | undefined;
    name: string | undefined;
  };
  _id: string;
  mobileNo: string;
  name: string;
  password: string;
  verified: boolean;
  __v: number;
  fcmToken: string;
  diamonds: number;
  gpayNo: string | undefined;
  phonePeNo: string | undefined;
  paytmNo: string | undefined;
}

type gameCatagories = "LuckBazar" | "Fatafat" | "SmartMatka" | "OpenClose";

interface LiveGameModalType {
  visible: boolean;
  setVisible: (state: boolean) => void;
  activeGameType: string;
  currentGameNo: number;
  setLiveGameNo: (state: number) => void;
}

interface Users {
  user: string;
  diamond: 20;
}

interface BetResponseData {
  bettingNo: number;
  totalDiamond: number;
  date: string;
  users: Users[];
}

interface UserModalTypes {
  visible: boolean;
  setVisible: (state: boolean) => void;
  users: Users[];
}

interface RechargeModalType {
  visible: boolean;
  setVisible: (state: boolean) => void;
}

interface WinLossType {
  _id: string;
  user: {
    _id: string;
    mobileNo: string;
  };
  diamond: number;
  baziNo: number;
  bettingNo: number;
  baziType: "Single Digit" | "Single Panna";
  gameType: string;
  date: string;
  __v: number;
  winLoss: boolean;
}

interface GameUsers {
  user: string;
  diamond: number;
  name: string;
}

interface GameBetsType {
  bettingNo: number;
  totalDiamond: number;
  date: string;
  users: GameUsers[];
}

interface PattiDataArray {
  label: number;
  totalDiamond: number;
}

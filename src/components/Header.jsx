import { BookOpen } from "lucide-react";

export function Header() {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-2">
        <BookOpen className="w-10 h-10 text-purple-600" />
        <h1 className="text-purple-800">قاموس متقن الكلمات</h1>
      </div>
      <p className="text-gray-700">تعلم المرادفات والأضداد واستخدام الكلمات!</p>
    </div>
  );
}

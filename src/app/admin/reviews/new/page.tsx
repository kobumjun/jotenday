import Link from "next/link";
import { redirect } from "next/navigation";
import { adminUpsertReview } from "@/app/admin/actions";
import { isAdminSession } from "@/lib/admin-session";

export default async function AdminReviewNewPage() {
  if (!(await isAdminSession())) redirect("/admin");

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/reviews" className="text-sm text-fuchsia-200 hover:underline">
        ← 목록
      </Link>
      <h1 className="mt-4 text-2xl font-semibold text-white">후기 등록</h1>
      <form action={adminUpsertReview} encType="multipart/form-data" className="mt-8 flex flex-col gap-4">
        <input type="hidden" name="id" value="" />
        <input type="hidden" name="existing_image_url" value="" />
        <input type="hidden" name="existing_image_path" value="" />
        <Field label="제목" name="title" required />
        <Field label="요약 (선택)" name="summary" />
        <div>
          <label className="text-sm text-zinc-300" htmlFor="content">
            본문
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={8}
            className="mt-1 w-full rounded-xl border border-white/10 bg-[#120c1d] px-4 py-3 text-sm text-white outline-none focus:border-fuchsia-400"
          />
        </div>
        <Field label="작성자 표시명" name="author_name" required />
        <div>
          <label className="text-sm text-zinc-300" htmlFor="image">
            이미지 (선택, 최대 2MB)
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="mt-2 block w-full text-sm text-zinc-300"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-zinc-300">
          <input type="checkbox" name="is_published" className="size-4" />
          공개 (사이트 노출)
        </label>
        <button
          type="submit"
          className="rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white"
        >
          저장
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  required,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm text-zinc-300" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        required={required}
        className="mt-1 w-full rounded-xl border border-white/10 bg-[#120c1d] px-4 py-3 text-sm text-white outline-none focus:border-fuchsia-400"
      />
    </div>
  );
}

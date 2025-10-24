import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/AuthContext";
import { supabase } from "../../supabaseClient";

// helpers
const getInitials = (first = "", last = "") =>
  `${(first[0] || "").toUpperCase()}${(last[0] || "").toUpperCase()}` || "U";

const colorMap = {
  blue: { bg: "#eaf3ff", mid: "#dbeafe", border: "#3b82f6", text: "#1e40af" },
  violet: { bg: "#f1ecff", mid: "#ede9fe", border: "#7c3aed", text: "#4c1d95" },
  pink: { bg: "#fff0f7", mid: "#fce7f3", border: "#ec4899", text: "#9d174d" },
  green: { bg: "#eefcf4", mid: "#dcfce7", border: "#22c55e", text: "#065f46" },
};

const statusClasses = {
  Open: "bg-green-600",
  Busy: "bg-yellow-500",
  "Do Not Disturb": "bg-red-600",
};

// detect dark mode (class on <html>)
const isDark =
  typeof window !== "undefined" &&
  document.documentElement.classList.contains("dark");

export default function Profile() {
  const navigate = useNavigate();
  const { user, signOut } = useUserAuth();
  const metadata = user?.user_metadata || {};

  const [isEditing, setIsEditing] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("blue");
  const [selectedStatus, setSelectedStatus] = useState("Open");

  const [formState, setFormState] = useState({
    firstname: metadata.firstname || "",
    lastname: metadata.lastname || "",
    dob: metadata.dob || "",
    phone: metadata.phone || "",
    company: "",
    designation: "",
    email: user?.email || "",
    tagline: "",
    bio: "",
    memberSince: metadata.memberSince || new Date().toISOString(),
  });

  // Accent CSS vars (scoped to this page)
  const accent = colorMap[selectedColor];
  const cssVars = useMemo(
    () => ({
      "--accent-bg": accent.bg,
      "--accent-mid": accent.mid,
      "--accent": accent.border,
      "--accent-text": accent.text,
      "--accent-weak": `${accent.border}26`, // ~15% opacity
    }),
    [accent]
  );

  // Fetch profile (fills selectedColor / status if present)
  const fetchProfile = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      console.error("Fetch profile error:", error.message);
      return;
    }
    if (data) {
      setFormState((prev) => ({
        ...prev,
        ...data,
        memberSince: data.membersince || prev.memberSince,
        // keep UI camelCase:
        firstname: data.firstname ?? "",
        lastname: data.lastname ?? "",
        company: data.company ?? "",
        designation: data.designation ?? "",
        tagline: data.tagline ?? "",
        bio: data.bio ?? "",
        phone: data.phone ?? "",
        email: data.email ?? user?.email ?? "",
      }));
      setSelectedColor(data.selectedcolor || "blue");
      setSelectedStatus(data.status || "Open");
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const handleSave = async () => {
    if (!user) return;

    // Map frontend state → database schema
    const payload = {
      id: user.id,
      firstname: formState.firstname,
      lastname: formState.lastname,
      dob: formState.dob,
      phone: formState.phone,
      email: formState.email,
      company: formState.company,
      designation: formState.designation,
      tagline: formState.tagline,
      bio: formState.bio,
      status: selectedStatus,
      selectedcolor: selectedColor, // DB column name
      membersince: formState.memberSince, // DB column name
    };

    const { error } = await supabase.from("profiles").upsert(payload);

    if (error) {
      console.error("Save profile error:", error.message);
      alert("Failed to save profile");
      return;
    }

    setIsEditing(false);
    alert("Profile saved!");
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const formattedMemberSince = new Date(
    formState.memberSince
  ).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main
      className="
        min-h-screen mt-10
        bg-[var(--surface)] text-[var(--text)]
        transition-colors
      "
      style={cssVars}
    >
      {/* background art – balanced for light/dark */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(800px 400px at -10% -10%, rgba(139,92,246,0.28), transparent 60%), radial-gradient(800px 500px at 110% 110%, rgba(14,165,233,0.28), transparent 55%)",
          opacity: 0.18,
        }}
      />

      {/* header */}
      <header className="max-w-5xl mx-auto px-4 pt-6 pb-4 text-center">
        <div className="mt-[20px] md:mt-10" />
        <h1 className="text-3xl font-extrabold">
          Welcome{" "}
          <span
            className="font-extrabold"
            style={{ color: "var(--accent-text)" }}
          >
            {formState.firstname || user?.email}
          </span>
        </h1>
        <p className="text-sm text-[var(--muted)]">
          Member since: {formattedMemberSince}
        </p>
      </header>

      {/* profile card */}
      <section className="max-w-5xl mx-auto px-4 pb-10">
        <div
          className="
            rounded-2xl overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-[320px_1fr]
            ring-1
          "
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          {/* left rail (accented) */}
          <aside
            className="
              relative p-6 md:p-8 flex flex-col items-center justify-center min-h-full
            "
            style={{
              backgroundColor: "var(--accent-mid)",
            }}
          >
            <div className="flex flex-col items-center">
              {/* avatar */}
              <div className="relative">
                {formState.avatarUrl ? (
                  <img
                    src={formState.avatarUrl}
                    alt="Avatar"
                    className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4"
                    style={{ borderColor: "var(--accent)" }}
                    onError={(e) => (e.currentTarget.src = "")}
                  />
                ) : (
                  <div
                    className="w-28 h-28 md:w-32 md:h-32 rounded-full grid place-items-center text-2xl md:text-3xl font-semibold border-4"
                    style={{
                      borderColor: "var(--accent)",
                      background: "var(--card)",
                    }}
                  >
                    {getInitials(formState.firstname, formState.lastname)}
                  </div>
                )}
                <span
                  className={`absolute bottom-1 right-1 md:bottom-2 md:right-2 w-4 h-4 rounded-full border-2 border-[var(--card)] ${statusClasses[selectedStatus]}`}
                />
              </div>

              {/* name + status */}
              <div className="mt-4 text-center">
                <div
                  className="font-bold text-lg text-black"
                  style={{
                    fontFamily: "'Audiowide', sans-serif",
                  }}
                >
                  {(formState.firstname || "FIRST") +
                    " " +
                    (formState.lastname || "LAST")}
                </div>

                {/* status pill (click to toggle) */}
                <div
                  onClick={() => setIsStatusOpen((v) => !v)}
                  className="
                    mt-2 inline-flex items-center gap-2 text-xs px-3 py-1
                    rounded-full bg-[var(--card)] shadow-sm
                    ring-1 cursor-pointer transition
                  "
                  style={{
                    borderColor: "var(--accent)",
                    boxShadow: "0 1px 2px rgba(0,0,0,.05)",
                  }}
                >
                  <span
                    className={`inline-block w-2.5 h-2.5 rounded-full ${statusClasses[selectedStatus]}`}
                  />
                  <span
                    className="font-medium"
                    style={{ color: "var(--text)" }}
                  >
                    Status: {selectedStatus}
                  </span>
                </div>

                {isStatusOpen && (
                  <div
                    className="mt-2 rounded-md shadow ring-1 overflow-hidden bg-[var(--card)]"
                    style={{ borderColor: "var(--accent)" }}
                  >
                    {["Open", "Busy", "Do Not Disturb"].map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setSelectedStatus(s);
                          setIsStatusOpen(false);
                          alert(`Status set to ${s}`);
                        }}
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-[var(--accent-weak)]"
                        style={{ color: "var(--text)" }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                {/* accent selectors */}
                <div className="mt-4 flex items-center justify-center gap-3">
                  {Object.keys(colorMap).map((key) => (
                    <button
                      key={key}
                      aria-label={`Select ${key} theme`}
                      onClick={() => setSelectedColor(key)}
                      className={`w-5 h-5 rounded-full border-2 ${
                        selectedColor === key ? "ring-2" : ""
                      }`}
                      style={{
                        backgroundColor: colorMap[key].mid,
                        borderColor: colorMap[key].border,
                        boxShadow:
                          selectedColor === key
                            ? "0 0 0 2px rgba(59,130,246,.35)"
                            : "none",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* DASHED mark (hidden on mobile) */}
              <span
                className="hidden md:block absolute bottom-3 left-4 text-xs tracking-[0.25em] font-semibold select-none"
                style={{
                  fontFamily: "'Audiowide', sans-serif",
                  color: "var(--muted)",
                }}
              >
                DASHED
              </span>
            </div>
          </aside>

          {/* form pane */}
          <main
            className="p-6 md:p-8 backdrop-blur"
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--card) 90%, transparent)",
            }}
          >
            <form className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  ["First Name", "firstname"],
                  ["Last Name", "lastname"],
                  ["Email", "email"],
                  ["Phone", "phone"],
                  ["Company", "company"],
                  ["Designation", "designation"],
                ].map(([label, field]) => (
                  <div key={field}>
                    <label
                      className="block text-sm font-medium"
                      style={{ color: "var(--muted)" }}
                    >
                      {label}
                    </label>
                    <input
                      type="text"
                      value={formState[field] || ""}
                      disabled={!isEditing || field === "email"}
                      onChange={(e) =>
                        setFormState((p) => ({ ...p, [field]: e.target.value }))
                      }
                      className="mt-1 w-full px-3 py-2 rounded-lg border text-sm focus:outline-none"
                      style={{
                        backgroundColor: "var(--card)",
                        color: "var(--text)",
                        // ✅ brighter border, especially in dark mode
                        borderColor: isDark
                          ? "rgba(255,255,255,0.22)"
                          : "color-mix(in srgb, var(--border) 70%, white 30%)",
                        boxShadow: "inset 0 1px 0 rgba(0,0,0,.02)",
                      }}
                      onFocus={(e) =>
                        (e.currentTarget.style.boxShadow =
                          "0 0 0 2px var(--accent-weak)")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.boxShadow =
                          "inset 0 1px 0 rgba(0,0,0,.02)")
                      }
                    />
                  </div>
                ))}
              </div>

              <div>
                <label
                  className="block text-sm font-medium"
                  style={{ color: "var(--muted)" }}
                >
                  Bio
                </label>
                <textarea
                  rows="4"
                  value={formState.bio || ""}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setFormState((p) => ({ ...p, bio: e.target.value }))
                  }
                  className="mt-1 w-full px-3 py-2 rounded-lg border text-sm focus:outline-none"
                  style={{
                    backgroundColor: "var(--card)",
                    color: "var(--text)",
                    borderColor: "var(--border)",
                    boxShadow: "inset 0 1px 0 rgba(0,0,0,.02)",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 0 0 2px var(--accent-weak)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "inset 0 1px 0 rgba(0,0,0,.02)")
                  }
                  placeholder="Tell us more about yourself..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                {!isEditing ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsEditing(true);
                    }}
                    className="px-4 py-2 rounded-lg text-white transition"
                    style={{ backgroundColor: "var(--accent)" }}
                  >
                    Edit
                  </button>
                ) : (
                  <>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleSave();
                      }}
                      className="px-4 py-2 rounded-lg text-white transition"
                      style={{ backgroundColor: "var(--accent)" }}
                    >
                      Save
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setIsEditing(false);
                      }}
                      className="px-4 py-2 rounded-lg"
                      style={{
                        backgroundColor: "var(--accent-weak)",
                        color: "var(--text)",
                      }}
                    >
                      Cancel
                    </button>
                  </>
                )}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleSignOut();
                  }}
                  className="ml-2 px-4 py-2 rounded-lg text-white hover:brightness-110"
                  style={{ backgroundColor: "#ef4444" }}
                >
                  Sign Out
                </button>
              </div>
            </form>
          </main>
        </div>
      </section>
    </main>
  );
}

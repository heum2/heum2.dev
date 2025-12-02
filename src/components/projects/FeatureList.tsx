interface FeatureListProps {
  features?: string[];
}

export function FeatureList({ features }: FeatureListProps) {
  if (!features || features.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-black dark:text-gray-100">
        주요 기능
      </h2>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <span className="text-green-500 dark:text-green-400 mr-2">✓</span>
            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
